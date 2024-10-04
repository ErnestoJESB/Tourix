namespace WebApi.Helpers
{
    public static class StringExtensions
    {
        public static List<double> ToDoubleList(this string str, char separator = ',')
        {
            if (string.IsNullOrWhiteSpace(str))
            {
                return new List<double>();
            }

            // Remover los corchetes si están presentes
            str = str.Trim('[', ']');

            var stringArray = str.Split(separator);

            var result = new List<double>();
            foreach (var item in stringArray)
            {
                if (double.TryParse(item.Trim(), out var num))
                {
                    result.Add(num);
                }
            }

            return result;
        }


        public static List<string> ToStringList(this string str, char separator = ',')
        {
            return str.Split(separator)
                      .ToList();
        }
    }
}
