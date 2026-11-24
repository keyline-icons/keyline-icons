import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CocktailTropical({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M16.1198 15.3561C15.0025 16.3989 13.5105 17 12 17C10.4895 17 8.9975 16.3989 7.8802 15.3561C6.7528 14.3038 6 12.7942 6 11C6 10.3183 6.1741 9.7545 6.4259 9.2718C6.6658 8.8121 6.9789 8.4255 7.2191 8.1253C7.4789 7.8005 7.6658 7.5621 7.8009 7.3031C7.9241 7.067 8 6.8183 8 6.5C8 6.2467 7.9597 6.0879 7.9112 5.9626C7.8518 5.809 7.7776 5.6889 7.6318 5.4336C7.324 4.8951 7 4.2238 7 3C7 1.8954 7.8954 1 9 1L15 1C16.1046 1 17 1.8954 17 3C17 4.2238 16.676 4.8951 16.3682 5.4336C16.2224 5.6889 16.1482 5.809 16.0888 5.9626C16.0403 6.0879 16 6.2467 16 6.5C16 6.8183 16.0759 7.067 16.1991 7.3031C16.3342 7.5621 16.5211 7.8005 16.7809 8.1253C17.0211 8.4255 17.3342 8.8121 17.5741 9.2718C17.8259 9.7545 18 10.3183 18 11C18 12.7942 17.2472 14.3038 16.1198 15.3561Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M9 2H15C15.5523 2 16 2.4477 16 3C16 5 15 5 15 6.5C15 8.5 17 9 17 11C17 14 14.5 16 12 16C9.5 16 7 14 7 11C7 9 9 8.5 9 6.5C9 5 8 5 8 3C8 2.4477 8.4477 2 9 2ZM9 6.5H15M12 16V22M8 22H16"/>
    </svg>
  )
}
