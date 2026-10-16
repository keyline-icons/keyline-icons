import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MessageSparkle({ size = 24, ...props }: IconProps) {
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
      <path d="M12 2C17.8553 2 23 5.8327 23 11C23 16.1673 17.8553 20 12 20C11.2351 20 10.4723 19.9337 9.7236 19.8047L5.4385 21.8984C5.1434 22.0425 4.7961 22.0329 4.5098 21.8721C4.2235 21.7112 4.0344 21.4197 4.0039 21.0928L3.6084 16.8252C1.9521 15.2269 1 13.1718 1 11C1 5.8327 6.1447 2 12 2Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M4.5686 16.353C2.915 14.8839 2 12.9769 2 11C2 6.5817 6.4772 3 12 3C17.5228 3 22 6.5817 22 11C22 15.4183 17.5228 19 12 19C11.1845 19 10.3721 18.9202 9.5808 18.7624L5 21L4.5686 16.353ZM12.4596 7.3123L13.2704 9.2043C13.3716 9.4404 13.5596 9.6284 13.7957 9.7296L15.6877 10.5404C16.0917 10.7136 16.0917 11.2864 15.6877 11.4596L13.7957 12.2704C13.5596 12.3716 13.3716 12.5596 13.2704 12.7957L12.4596 14.6877C12.2864 15.0917 11.7136 15.0917 11.5404 14.6877L10.7296 12.7957C10.6284 12.5596 10.4404 12.3716 10.2043 12.2704L8.3123 11.4596C7.9083 11.2864 7.9083 10.7136 8.3123 10.5404L10.2043 9.7296C10.4404 9.6284 10.6284 9.4404 10.7296 9.2043L11.5404 7.3123C11.7136 6.9083 12.2864 6.9083 12.4596 7.3123Z"/>
    </svg>
  )
}
