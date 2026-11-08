import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function NavigationLine({ size = 24, ...props }: IconProps) {
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
      <path d="M12 6.001V2.0016M6.051 21.3285L11.5882 10.2503C11.7579 9.9203 12.2421 9.9203 12.4118 10.2503L17.9489 21.3285C18.1325 21.6984 17.7807 22.0983 17.3916 21.9784L12.1456 20.2286C12.0511 20.1887 11.9489 20.1887 11.8544 20.2286L6.6085 21.9784C6.2193 22.0983 5.8676 21.6984 6.051 21.3285Z"/>
    </svg>
  )
}
