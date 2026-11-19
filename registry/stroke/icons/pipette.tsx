import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Pipette({ size = 24, ...props }: IconProps) {
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
      <path d="M14.8206 14.6242L9.3758 9.1794C8.5167 8.3203 8.5167 6.9273 9.3758 6.0682C10.235 5.209 11.628 5.209 12.4871 6.0682L12.9114 6.4924C13.1066 6.6877 13.4232 6.6877 13.6185 6.4924L16.3055 3.8054C17.3794 2.7315 19.1206 2.7315 20.1946 3.8054C21.2685 4.8794 21.2685 6.6206 20.1946 7.6945L17.5076 10.3815C17.3123 10.5768 17.3123 10.8934 17.5076 11.0886L17.9318 11.5129C18.791 12.372 18.791 13.765 17.9318 14.6242C17.0727 15.4833 15.6797 15.4833 14.8206 14.6242ZM10.5426 10.3462L4.5556 16.3331C4.416 16.4728 4.3208 16.6505 4.2821 16.8441L3.8579 18.9654C3.7179 19.6652 4.3348 20.2821 5.0346 20.1421L7.1559 19.7179C7.3495 19.6792 7.5272 19.584 7.6669 19.4444L13.6538 13.4574M4.1314 19.8686L3 21" fill="none"/>
    </svg>
  )
}
