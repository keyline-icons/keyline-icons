import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function PiggyBank({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M13.074 6C13.4604 5.3259 14.6805 4.1477 17.2892 4.0127L17.7895 3.9868L17.7895 4.5L17.7895 7.4175L17.7895 7.7645L18.1392 7.9171C19.311 8.4281 19.7857 9.5613 19.7979 11.0491L19.8021 11.579L20.314 11.579L21.5 11.579L22 11.579L22 12.079L22 13.9211L22 14.4211L21.5 14.4211L20.2839 14.4211L19.7799 14.4211L19.8085 14.9198C19.8692 15.978 19.8425 17.6743 16.8811 18.2913L16.4598 18.3791L16.4598 18.795L16.4598 21.5L16.4598 22L15.9598 22L13.8308 22L13.5789 22L13.429 21.7976L11.6236 19.3603L11.4737 19.1579L11.2218 19.1579L10.6729 19.1579L10.421 19.1579L10.2711 19.3603L8.4657 21.7976L8.3158 22L8.0639 22L5.8795 22L5.3795 22L5.3795 21.5L5.3795 19.4879L5.3795 19.1674L5.0791 19.0205C3.0584 18.0324 2 16.1626 2 13C2 12.0836 2.1851 11.2551 2.5263 10.5197C2.7763 9.9809 3.072 9.4716 3.4139 9M9 4C9 5.1046 8.1046 6 7 6C5.8954 6 5 5.1046 5 4C5 2.8954 5.8954 2 7 2C8.1046 2 9 2.8954 9 4Z" fill="none"/>
      <path d="M17 10.5C17 11.0523 16.5523 11.5 16 11.5C15.4477 11.5 15 11.0523 15 10.5C15 9.9477 15.4477 9.5 16 9.5C16.5523 9.5 17 9.9477 17 10.5Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
